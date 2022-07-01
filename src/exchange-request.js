export default class ExchangeRequest {
  static async getExchange(){
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/US`);
      if (!response.ok) {
        throw Error(response.status);   
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}