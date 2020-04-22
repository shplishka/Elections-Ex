import { Model, DataTypes, BuildOptions } from 'sequelize';

import {database} from '../util/database'

export interface Party extends Model {
  readonly name: string;
  readonly urlLogo:string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type PartiesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Party;
}

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const Parties = <PartiesStatic>database.define('Party', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  urlLogo: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Parties;