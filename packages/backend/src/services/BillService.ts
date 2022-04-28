/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { Bill } from '@/entities/Bill';
import { Order } from '@/entities/Order';
import { Staff } from '@/entities/Staff';
import { ForbiddenException } from '@/exceptions/ForbiddenException';
import { InvalidRequestException } from '@/exceptions/InvalidRequestException';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { BillRepository } from '@/repositories/bill/BillRepository';
import { OrderRepository } from '@/repositories/order/OrderRepository';
import { ReadOptions } from '@/repositories/ReadOptions';
import { StaffRepository } from '@/repositories/staff/StaffRepository';

export class BillService {

  private readonly billRepository: BillRepository;
  private readonly staffRepository: StaffRepository;
  private readonly orderRepository: OrderRepository;

  public constructor(
    billRepository: BillRepository,
    staffRepository: StaffRepository,
    orderRepository: OrderRepository,
  ) {
    this.billRepository = billRepository;
    this.staffRepository = staffRepository;
    this.orderRepository = orderRepository;
  }

  public async getAllBills(readOptions?: ReadOptions): Promise<Bill[]> {
    const expectedBills = new Bill();
    return this.billRepository.read(expectedBills, readOptions);
  }

  public async getBillsByBranchId(branchId: number, readOptions?: ReadOptions): Promise<Bill[]> {
    return this.billRepository.readByBranchId(branchId, readOptions);
  }

  public async addBill(newBill: Bill): Promise<Bill> {
    await this.validateStaff(newBill.getOrderBy());

    return this.billRepository.create(newBill);
  }

  public async editBill(billId: number, newBill: Bill, staffId: number): Promise<Bill> {
    const targetBill = await this.validateBill(billId, staffId);

    const newStaffId = newBill.getOrderBy();

    if (newStaffId) {
      await this.validateStaff(newStaffId);
      await this.validateBill(billId, newStaffId);
    }

    const affectedRowsAmount = await this.billRepository.update(newBill, targetBill);

    return affectedRowsAmount === 1 ? newBill.setBillId(billId) : null;
  }

  public async deleteBill(billId: number, staffId: number) {
    const targetBill = await this.validateBill(billId, staffId);

    const expectedRelatedOrders = new Order().setBillId(billId);
    const relatedOrders = await this.orderRepository.read(expectedRelatedOrders);

    if (relatedOrders.length !== 0) {
      throw new InvalidRequestException('There are orders still related to this bill');
    }

    const affectedRowsAmount = await this.billRepository.delete(targetBill);

    return affectedRowsAmount === 1 ? targetBill : null;
  }

  private async validateStaff(staffId: number): Promise<void> {
    const expectedRelatedStaff = new Staff().setStaffId(staffId);
    const [expectedStaff] = await this.staffRepository.read(expectedRelatedStaff);

    if (!expectedStaff) {
      throw new NotFoundException('Staff related to bill does not exist');
    }
  }

  private async validateBill(billId: number, staffId: number): Promise<Bill> {
    const billToValidate = new Bill().setBillId(billId);
    const [targetBill] = await this.billRepository.read(billToValidate);

    if (!targetBill) {
      throw new NotFoundException('Bill does not exist');
    }

    const ordererToValidate = new Staff().setStaffId(targetBill.getOrderBy());
    const [targetOrderer] = await this.staffRepository.read(ordererToValidate);

    const currentStaffToValidate = new Staff().setStaffId(staffId);
    const [targetCurrentStaff] = await this.staffRepository.read(currentStaffToValidate);

    if (
      targetOrderer.getBranchId() !== targetCurrentStaff.getBranchId()
      && targetCurrentStaff.getPosition() !== 'CEO'
    ) {
      throw new ForbiddenException('This bill does not belong to your branch');
    }

    return targetBill;
  }

}