export interface iSubMenu {
  title: string;
  icon: any;
  href: string;
  isActive: boolean;
}

export interface iSubMenus {
  title: string;
  subMenu: iSubMenu[];
}
