import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any }
  UUID: { input: any; output: any }
  _FieldSet: { input: any; output: any }
}

export type Contribution = {
  __typename?: 'Contribution'
  id: Scalars['UUID']['output']
  organizationId: Scalars['UUID']['output']
  project: Project
  uploadedAt: Scalars['DateTime']['output']
  userId: Scalars['UUID']['output']
}

export type ContributionFilters = {
  id?: InputMaybe<FilterOptions>
  organizationId?: InputMaybe<FilterOptions>
  uploadAt?: InputMaybe<FilterOptions>
  userId?: InputMaybe<FilterOptions>
}

export type ContributionSort = {
  id?: InputMaybe<SortOptions>
  organizationId?: InputMaybe<SortOptions>
  uploadAt?: InputMaybe<SortOptions>
  userId?: InputMaybe<SortOptions>
}

export type FilterOptions = {
  equal?: InputMaybe<Scalars['String']['input']>
  isTrue?: InputMaybe<Scalars['Boolean']['input']>
}

export type InputContribution = {
  project: InputProject
}

export type InputProject = {
  name: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Creates new Contributions */
  addContributions: Array<Contribution>
}

export type MutationAddContributionsArgs = {
  contributions: Array<InputContribution>
}

export type Project = {
  __typename?: 'Project'
  id: Scalars['UUID']['output']
  name: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  /** Returns all contributions assigned to user */
  contributions: Array<Contribution>
  /** Returns all Projects */
  projects: Array<Project>
}

export type QueryContributionsArgs = {
  filters?: InputMaybe<ContributionFilters>
  sortBy?: InputMaybe<ContributionSort>
}

export enum SortOptions {
  Asc = 'ASC',
  Dsc = 'DSC',
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Contribution: ResolverTypeWrapper<Contribution>
  ContributionFilters: ContributionFilters
  ContributionSort: ContributionSort
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>
  FilterOptions: FilterOptions
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  InputContribution: InputContribution
  InputProject: InputProject
  Mutation: ResolverTypeWrapper<{}>
  Project: ResolverTypeWrapper<Project>
  Query: ResolverTypeWrapper<{}>
  SortOptions: SortOptions
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Contribution: Contribution
  ContributionFilters: ContributionFilters
  ContributionSort: ContributionSort
  DateTime: Scalars['DateTime']['output']
  FilterOptions: FilterOptions
  String: Scalars['String']['output']
  Boolean: Scalars['Boolean']['output']
  InputContribution: InputContribution
  InputProject: InputProject
  Mutation: {}
  Project: Project
  Query: {}
  UUID: Scalars['UUID']['output']
}

export type DeferDirectiveArgs = {
  if?: Scalars['Boolean']['input']
  label?: Maybe<Scalars['String']['input']>
}

export type DeferDirectiveResolver<Result, Parent, ContextType = any, Args = DeferDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>

export type ContributionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Contribution'] = ResolversParentTypes['Contribution'],
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  uploadedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addContributions?: Resolver<
    Array<ResolversTypes['Contribution']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddContributionsArgs, 'contributions'>
  >
}

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  contributions?: Resolver<
    Array<ResolversTypes['Contribution']>,
    ParentType,
    ContextType,
    RequireFields<QueryContributionsArgs, 'filters' | 'sortBy'>
  >
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID'
}

export type Resolvers<ContextType = any> = {
  Contribution?: ContributionResolvers<ContextType>
  DateTime?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  UUID?: GraphQLScalarType
}

export type DirectiveResolvers<ContextType = any> = {
  defer?: DeferDirectiveResolver<any, any, ContextType>
}

export type GetContributionsQueryVariables = Exact<{ [key: string]: never }>

export type GetContributionsQuery = {
  __typename?: 'Query'
  contributions: Array<{
    __typename?: 'Contribution'
    id: any
    uploadedAt: any
    project: { __typename?: 'Project'; name: string }
  }>
}

export type AddContributionMutationVariables = Exact<{
  contributions: Array<InputContribution> | InputContribution
}>

export type AddContributionMutation = {
  __typename?: 'Mutation'
  addContributions: Array<{ __typename?: 'Contribution'; id: any }>
}

export const GetContributionsDocument = gql`
  query getContributions {
    contributions {
      id
      uploadedAt
      project {
        name
      }
    }
  }
`

/**
 * __useGetContributionsQuery__
 *
 * To run a query within a React component, call `useGetContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContributionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContributionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetContributionsQuery, GetContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetContributionsQuery, GetContributionsQueryVariables>(GetContributionsDocument, options)
}
export function useGetContributionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetContributionsQuery, GetContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetContributionsQuery, GetContributionsQueryVariables>(GetContributionsDocument, options)
}
export function useGetContributionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetContributionsQuery, GetContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetContributionsQuery, GetContributionsQueryVariables>(
    GetContributionsDocument,
    options,
  )
}
export type GetContributionsQueryHookResult = ReturnType<typeof useGetContributionsQuery>
export type GetContributionsLazyQueryHookResult = ReturnType<typeof useGetContributionsLazyQuery>
export type GetContributionsSuspenseQueryHookResult = ReturnType<typeof useGetContributionsSuspenseQuery>
export type GetContributionsQueryResult = Apollo.QueryResult<GetContributionsQuery, GetContributionsQueryVariables>
export const AddContributionDocument = gql`
  mutation addContribution($contributions: [InputContribution!]!) {
    addContributions(contributions: $contributions) {
      id
    }
  }
`
export type AddContributionMutationFn = Apollo.MutationFunction<
  AddContributionMutation,
  AddContributionMutationVariables
>

/**
 * __useAddContributionMutation__
 *
 * To run a mutation, you first call `useAddContributionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContributionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContributionMutation, { data, loading, error }] = useAddContributionMutation({
 *   variables: {
 *      contributions: // value for 'contributions'
 *   },
 * });
 */
export function useAddContributionMutation(
  baseOptions?: Apollo.MutationHookOptions<AddContributionMutation, AddContributionMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddContributionMutation, AddContributionMutationVariables>(AddContributionDocument, options)
}
export type AddContributionMutationHookResult = ReturnType<typeof useAddContributionMutation>
export type AddContributionMutationResult = Apollo.MutationResult<AddContributionMutation>
export type AddContributionMutationOptions = Apollo.BaseMutationOptions<
  AddContributionMutation,
  AddContributionMutationVariables
>
