class GoodsTypeModel extends Object {
    static listAll() {
        this.$http();
    }
}
GoodsTypeModel.baseURL = "http://localhost:3000/shop-service/v1";
export { GoodsTypeModel };
