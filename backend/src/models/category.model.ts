import { Schema,model } from "mongoose";

export interface CategoryInterface {
    category_name: string;
    logo?: string; // Optional property
  }


const CategorySchema = new Schema<CategoryInterface>({
    category_name:{
        type:String,
        required:true
    },
    logo:{
        type:String
    }
});

const Category = model<CategoryInterface>('Category',CategorySchema);
export default Category;