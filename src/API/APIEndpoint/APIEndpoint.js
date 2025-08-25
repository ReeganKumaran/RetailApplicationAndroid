const URLOption = 1;

export const baseURL = () => {
    switch (URLOption) {
        case 1:
            return "http://10.105.197.42:5000";
        case 2:
            return "http://localhost:5000"; // not in working condition
        default:
            return "http://10.105.197.42:5000"; // not in working condition
    }
}
