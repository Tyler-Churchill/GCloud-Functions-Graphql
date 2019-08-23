import { Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolvers {
  @Query(returns => String, { description: '' })
  usersVersion() {
    return 'v1.0.0';
  }
}

