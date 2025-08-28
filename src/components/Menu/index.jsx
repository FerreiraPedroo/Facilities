import { Menubar } from 'primereact/menubar';

const items=[
 {
  id: 1,
  label: "Requisicões",
  icon: "",
  url: "/requisicoes"
 },
 {
  id: 2,
  label: "Projetos",
  icon: "",
  url: "/projetos"
 }
]
export function Menu() {

return ( <Menubar model={items} /> )

}