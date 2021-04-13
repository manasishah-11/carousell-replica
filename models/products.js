class Product {
    constructor(id, catName, subName, name, createdAt, imageUrls, price, description, iconUrl, subCatImageUrl) {
        this.id = id;
        this.catName = catName;
        this.subName = subName;
        this.name = name;
        this.createdAt = createdAt;
        this.imageUrls = imageUrls;
        this.price = price;
        this.description = description;
        this.iconUrl = iconUrl;
        this.subCatImageUrl = subCatImageUrl;
    }
}

export default Product;