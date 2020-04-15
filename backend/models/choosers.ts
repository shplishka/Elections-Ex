import { Model, DataTypes, BuildOptions } from 'sequelize';

import {database} from '../util/database'

export interface Chooser extends Model {
  readonly idNumber: number;
  readonly party:string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type ChooserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Chooser;
}

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const Choosers = <ChooserStatic>database.define('Chooser', {
  idNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  party: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Choosers;