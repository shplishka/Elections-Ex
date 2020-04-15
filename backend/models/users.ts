import { Model, DataTypes, BuildOptions } from 'sequelize';

import {database} from '../util/database'

export interface User extends Model {
  readonly idNumber: number;
  readonly firstName:string;
  readonly lastName:string;
  readonly password:string;
  readonly email:string;
}
// Need to declare the static model so `findOne` etc. use correct types.
type UsersStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
}
// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const Users = <UsersStatic>database.define('User', {
  idNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
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