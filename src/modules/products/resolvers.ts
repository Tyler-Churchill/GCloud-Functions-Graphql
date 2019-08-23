import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ProductResolvers {
  @Query(returns => String, { description: '' })
  productsVersion() {
    return 'v1.0.0';
  }
}