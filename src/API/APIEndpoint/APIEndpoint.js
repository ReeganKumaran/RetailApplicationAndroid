const URLOption = 3;

export const baseURL = () => {
  switch (URLOption) {
    case 1:
      return "https://retailapplication-30d9.onrender.com";
    case 2:
      return "http://10.41.173.42:5000"; // not in working condition
    default:
      return "http://10.178.240.42:5000"; // Use your computer's IP instead of localhost
  }
};
