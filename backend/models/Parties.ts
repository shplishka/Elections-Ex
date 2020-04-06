import { Model, DataTypes, BuildOptions } from 'sequelize';

import {database} from '../util/database'

// We need to declare an interface for our model that is basically what our class would be
interface Parties extends Model {
  readonly name: string;
  readonly logoUrl:string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type PartiesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Parties;
}

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const Parties = <PartiesStatic>database.define('PartiesModel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Parties;