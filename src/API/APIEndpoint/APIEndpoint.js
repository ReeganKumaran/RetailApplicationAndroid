const URLOption = 3; // 1: Deployed, 2: Localhost, 3: LAN IP

export const baseURL = () => {
  switch (URLOption) {
    case 1:
      return "https://retailapplication-30d9.onrender.com";
    case 2:
      return "http://localhost:5000"; // not in working condition
    default:
      return "http://192.168.0.19:5000"; // Use your computer's IP instead of localhost
  }
};
