import { Machine } from '@/entities/Machine';
import { MachineRepository } from '@/repositories/machine/MachineRepository';
import { ReadOptions } from '@/repositories/ReadOptions';
import { Database } from '@/utils/database/Database';
import { DateUtil } from '@/utils/DateUtil';

export class DefaultMachineRepository extends Database implements MachineRepository {

  public async create(machine: Machine): Promise<Machine> {
    const parameter = {
      zone_id: machine.getZoneId(),
      name: machine.getName(),
      serial: machine.getSerial(),
      manufacturer: machine.getManufacturer(),
      registration_date: DateUtil.formatToSQL(machine.getRetiredDate()),
      retired_date: DateUtil.formatToSQL(machine.getRetiredDate()),
    };

    try {
      const result: any = await this.getSqlBuilder().insert('Machine', parameter);
      return machine.setMachineId(result[0].insertId);
    } catch (e) {
      return null;
    }
  }

  public async read(machine: Machine, readOptions?: ReadOptions): Promise<Machine[]> {
    const parameter = {
      machine_id: machine.getMachineId(),
      zone_id: machine.getZoneId(),
      name: machine.getName(),
      serial: machine.getSerial(),
      manufacturer: machine.getManufacturer(),
      registration_date: machine.getRegistrationDate(),
      retired_date: machine.getRetiredDate(),
    };

    const results: any = await this.getSqlBuilder().read('Machine', parameter, readOptions);

    const machines = results[0].map((result) => {
      return new Machine()
        .setMachineId(result.machine_id)
        .setZoneId(result.zone_id)
        .setName(result.name)
        .setSerial(result.serial)
        .setRegistrationDate(DateUtil.formatFromSQL(result.registration_date))
        .setRetiredDate(DateUtil.formatFromSQL(result.retired_date));
    });

    return machines;
  }

  public async update(source: Machine, destination: Machine): Promise<number> {
    const sourceParameter = {
      zone_id: source.getZoneId(),
      name: source.getName(),
      serial: source.getSerial(),
      manufacturer: source.getManufacturer(),
      registration_date: source.getRegistrationDate(),
      retired_date: source.getRetiredDate(),
    };

    const destinationParameter = {
      machine_id: destination.getMachineId(),
      zone_id: destination.getZoneId(),
      name: destination.getName(),
      serial: destination.getSerial(),
      manufacturer: destination.getManufacturer(),
      registration_date: destination.getRegistrationDate(),
      retired_date: destination.getRetiredDate(),
    };

    const result: any = await this.getSqlBuilder().update('Machine', sourceParameter, destinationParameter);

    return result[0].affectedRows;
  }

  public async delete(machine: Machine): Promise<number> {
    const parameter = {
      machine_id: machine.getMachineId(),
      zone_id: machine.getZoneId(),
      name: machine.getName(),
      serial: machine.getSerial(),
      manufacturer: machine.getManufacturer(),
      registration_date: machine.getRegistrationDate(),
      retired_date: machine.getRetiredDate(),
    };

    const result: any = await this.getSqlBuilder().delete('Machine', parameter);

    return result[0].affectedRows;
  }

}