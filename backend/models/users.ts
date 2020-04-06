import { Model, DataTypes, BuildOptions } from 'sequelize';

import {database} from '../util/database'

// We need to declare an interface for our model that is basically what our class would be
interface Users extends Model {
  readonly idNumber: number;
  readonly password:string;
  readonly email:string;

}

// Need to declare the static model so `findOne` etc. use correct types.
type UsersStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Users;
}

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const Users = <UsersStatic>database.define('UsersModel', {
  idNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Users;