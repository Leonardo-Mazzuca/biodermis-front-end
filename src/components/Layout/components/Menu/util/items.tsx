

import { GoPackage, GoHome, GoPeople } from "react-icons/go";
import { RiTruckLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { DEFAULT_PATH, HOME } from "../../../../../constants/paths/paths";

export const items = [

  { icon: GoHome, label: 'Home', path: HOME },
  { icon: RiTruckLine , label: 'Pedidos', path: DEFAULT_PATH },
  { icon: GoPeople, label: 'Consultores', path: DEFAULT_PATH },
  { icon: BiUser, label: 'Usuários', path: DEFAULT_PATH },
  { icon: GoPackage, label: 'Produtos', path: DEFAULT_PATH },
  { icon: FaHandHoldingDollar, label: 'Pedidos de saque', path: DEFAULT_PATH },
  { icon: LiaMoneyBillWaveSolid, label: 'Faturamento',  path: DEFAULT_PATH },

].map((item, index) => ({

  key: String(index + 1),
  icon: item.icon,
  label: item.label,
  path: item.path,

}));