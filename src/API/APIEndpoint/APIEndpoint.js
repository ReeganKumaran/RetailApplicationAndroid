const URLOption = 2;

export const baseURL = () => {
  switch (URLOption) {
    case 1:
      return "http://192.168.56.1:5000";
    case 2:
      return "http://10.29.146.42:5000"; // not in working condition
    default:
      return "http://localhost:5000"; // not in working condition
  }
};
