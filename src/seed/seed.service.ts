import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ) { }

  async runSeed() {
    await this.insertNewProducts();
    return 'Seed executed';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<any>[] = [];

    products.forEach(product => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
