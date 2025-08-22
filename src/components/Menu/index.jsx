export function Menu() {
return (
  <div className="w-full flex p-2 bg-stone-300">
    <div className="w-full flex items-center">
      <div className="px-4">
        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="size-8" />
      </div>
      <div class="w-full ml-4 flex items-baseline space-x-4">
        <a href="/requisicoes" className="rounded-md px-3 py-2 hover:bg-stone-400">Requisições</a>
        <a href="/projetos" className="rounded-md px-3 py-2 hover:bg-stone-400">Projetos</a>
      </div>
    </div>
    <div className="">
      <button className="">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-8 rounded-full outline outline-white/0" />
      </button>
    </div>
  </div>
  )
}