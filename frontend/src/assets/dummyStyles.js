// colors
export const colors = {
  deepBlue: "#0D1B4C",       // Sidebar blue
  royalBlue: "#1A3FFF",      // Primary accent
  deepPurple: "#3A00A8",     // Secondary accent
  softGray: "#F5F7FA",       // Workspace background
};

//gradiants
export const gradients = {
  primary: "bg-gradient-to-r from-[#1A3FFF] to-[#3A00A8]",
  primaryHover: "hover:shadow-[0_0_20px_rgba(26,63,255,0.45)]",
};

//shadows
export const shadows = {
  card: "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
  cardHover: "hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]",
};

// floating cards
export const cardStyles = {
  base:
    "rounded-2xl p-8 bg-white shadow-md transition-all duration-300 " +
    "hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]",

  title: "text-xl font-semibold text-gray-900 mb-2",
  description: "text-gray-600 text-sm",
};

//inputs
export const inputStyles = {
  base:
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 " +
    "focus:ring-[#1A3FFF] outline-none transition-all duration-300 bg-white",
};

//buttons
export const buttonStyles = {
  primary:
    "px-6 py-3 rounded-lg text-white font-semibold text-lg transition-all duration-300 " +
    "bg-gradient-to-r from-[#1A3FFF] to-[#3A00A8] hover:shadow-[0_0_20px_rgba(26,63,255,0.45)]",

  secondary:
    "px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 " +
    "bg-[#1A3FFF] hover:bg-[#1533CC]",
};

// sidebar
export const sidebarStyles = {
  container:
    "fixed left-0 top-0 w-64 h-screen text-white bg-[#0D1B4C] shadow-2xl",

  item:
    "flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white " +
    "hover:bg-white/10 rounded-lg transition-all duration-300",

  active:
    "flex items-center gap-3 px-6 py-3 bg-white/10 text-white rounded-lg shadow-lg",
};

//navbar
export const navbarStyles = {
  navbarContainer:
    "fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all duration-300",

  contentWrapper: "max-w-7xl mx-auto px-6",
  flexContainer: "flex items-center justify-between h-20",

  logoLink: "flex items-center gap-3",
  logoContainer: "flex items-center",
  logoImage: "h-12 w-auto",

  desktopNav: "hidden md:flex",
  navItemsContainer: "flex items-center gap-10",

  navItem:
    "relative text-gray-700 font-medium transition-all duration-300 hover:text-[#1A3FFF]",

  navItemActive:
    "text-[#1A3FFF] font-semibold after:absolute after:left-0 after:-bottom-1 " +
    "after:w-full after:h-[2px] after:bg-[#1A3FFF] after:rounded-full",

  navItemInactive: "text-gray-700",

  rightContainer: "flex items-center gap-4",

  loginButton:
    "px-6 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg " +
    "bg-gradient-to-r from-[#1A3FFF] to-[#3A00A8] transition-all duration-300",

  doctorAdminButton:
    "flex items-center gap-2 px-5 py-2 rounded-lg text-white font-medium " +
    "bg-gradient-to-r from-[#1A3FFF] to-[#3A00A8] shadow-md hover:shadow-lg transition-all",

  doctorAdminIcon: "w-5 h-5",
  doctorAdminText: "font-medium",
};

//role cards
export const roleCardStyles = {
  wrapper:
    "bg-white rounded-2xl p-8 shadow-md transition-all duration-300 cursor-pointer " +
    "hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]",

  title: "text-xl font-semibold text-gray-900 mb-2",
  description: "text-gray-600 text-sm mb-6",
  button:
    "px-5 py-2 rounded-lg bg-gradient-to-r from-[#1A3FFF] to-[#3A00A8] " +
    "text-white font-medium shadow-md hover:shadow-lg transition-all",
};