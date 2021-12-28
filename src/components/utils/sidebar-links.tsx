export type SideBarMenuData = {
  title: string;
  subModules: {
    title: string;
    path: string;
  }[]
}

export const SideBarData: SideBarMenuData[] = [
  {
    title: 'Proyectos',
    subModules: [
      {
        title: 'Resumen',
        path: '#',
      },
      {
        title: 'Estadísticas',
        path: '#',
      }
    ]
  },
  {
    title: 'Licitaciones y Contratación',
    subModules: [
      {
        title: 'Abrir Licitación',
        path: '#',
      },
      {
        title: 'Editor de licitaciones',
        path: '#',
      },
      {
        title: 'Evaluaciones',
        path: '#',
      },
      {
        title: 'Ofertas',
        path: '#'
      }
    ]
  },
  {
    title: 'Gestión y Administración',
    subModules: [
      {
        title: 'Preferencias',
        path: '#',
      },
      {
        title: 'Roles',
        path: '#',
      },
      {
        title: 'Credenciales',
        path: '#'
      }
    ]
  },
];
