import { Model, DataTypes, BuildOptions } from 'sequelize';

import {database} from '../util/database'

// We need to declare an interface for our model that is basically what our class would be
interface Chooser extends Model {
  readonly name: string;
  readonly logoUrl:string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type ChooserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Chooser;
}

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const Chooser = <ChooserStatic>database.define('ChooserModel', {
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

export default Chooser;