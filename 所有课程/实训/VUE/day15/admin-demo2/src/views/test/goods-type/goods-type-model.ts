class GoodsTypeModel extends Object {
  public static baseURL: string = "http://localhost:3000/shop-service/v1";

  public static listAll(): Promise<Response> {
    this.$http()
  }
}

export { GoodsTypeModel };
