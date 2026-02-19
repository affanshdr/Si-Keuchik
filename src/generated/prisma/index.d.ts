
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PengajuanSurat
 * 
 */
export type PengajuanSurat = $Result.DefaultSelection<Prisma.$PengajuanSuratPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PengajuanSurats
 * const pengajuanSurats = await prisma.pengajuanSurat.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PengajuanSurats
   * const pengajuanSurats = await prisma.pengajuanSurat.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pengajuanSurat`: Exposes CRUD operations for the **PengajuanSurat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PengajuanSurats
    * const pengajuanSurats = await prisma.pengajuanSurat.findMany()
    * ```
    */
  get pengajuanSurat(): Prisma.PengajuanSuratDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PengajuanSurat: 'PengajuanSurat',
    Admin: 'Admin'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pengajuanSurat" | "admin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PengajuanSurat: {
        payload: Prisma.$PengajuanSuratPayload<ExtArgs>
        fields: Prisma.PengajuanSuratFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PengajuanSuratFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PengajuanSuratFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>
          }
          findFirst: {
            args: Prisma.PengajuanSuratFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PengajuanSuratFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>
          }
          findMany: {
            args: Prisma.PengajuanSuratFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>[]
          }
          create: {
            args: Prisma.PengajuanSuratCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>
          }
          createMany: {
            args: Prisma.PengajuanSuratCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PengajuanSuratCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>[]
          }
          delete: {
            args: Prisma.PengajuanSuratDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>
          }
          update: {
            args: Prisma.PengajuanSuratUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>
          }
          deleteMany: {
            args: Prisma.PengajuanSuratDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PengajuanSuratUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PengajuanSuratUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>[]
          }
          upsert: {
            args: Prisma.PengajuanSuratUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengajuanSuratPayload>
          }
          aggregate: {
            args: Prisma.PengajuanSuratAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePengajuanSurat>
          }
          groupBy: {
            args: Prisma.PengajuanSuratGroupByArgs<ExtArgs>
            result: $Utils.Optional<PengajuanSuratGroupByOutputType>[]
          }
          count: {
            args: Prisma.PengajuanSuratCountArgs<ExtArgs>
            result: $Utils.Optional<PengajuanSuratCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    pengajuanSurat?: PengajuanSuratOmit
    admin?: AdminOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model PengajuanSurat
   */

  export type AggregatePengajuanSurat = {
    _count: PengajuanSuratCountAggregateOutputType | null
    _avg: PengajuanSuratAvgAggregateOutputType | null
    _sum: PengajuanSuratSumAggregateOutputType | null
    _min: PengajuanSuratMinAggregateOutputType | null
    _max: PengajuanSuratMaxAggregateOutputType | null
  }

  export type PengajuanSuratAvgAggregateOutputType = {
    id: number | null
  }

  export type PengajuanSuratSumAggregateOutputType = {
    id: number | null
  }

  export type PengajuanSuratMinAggregateOutputType = {
    id: number | null
    nama_lengkap: string | null
    no_nik: string | null
    no_kk: string | null
    tempat_lahir: string | null
    tanggal_lahir: string | null
    jenis_kelamin: string | null
    agama: string | null
    pekerjaan: string | null
    alamat: string | null
    foto_ktp: string | null
    jenis_surat: string | null
    status: string | null
    no_pengajuan: string | null
    catatan_penolakan: string | null
    nomor_surat: string | null
    file_surat: string | null
    tanggal_pengajuan: Date | null
    tanggal_selesai: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PengajuanSuratMaxAggregateOutputType = {
    id: number | null
    nama_lengkap: string | null
    no_nik: string | null
    no_kk: string | null
    tempat_lahir: string | null
    tanggal_lahir: string | null
    jenis_kelamin: string | null
    agama: string | null
    pekerjaan: string | null
    alamat: string | null
    foto_ktp: string | null
    jenis_surat: string | null
    status: string | null
    no_pengajuan: string | null
    catatan_penolakan: string | null
    nomor_surat: string | null
    file_surat: string | null
    tanggal_pengajuan: Date | null
    tanggal_selesai: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PengajuanSuratCountAggregateOutputType = {
    id: number
    nama_lengkap: number
    no_nik: number
    no_kk: number
    tempat_lahir: number
    tanggal_lahir: number
    jenis_kelamin: number
    agama: number
    pekerjaan: number
    alamat: number
    foto_ktp: number
    jenis_surat: number
    data_tambahan: number
    status: number
    no_pengajuan: number
    catatan_penolakan: number
    nomor_surat: number
    file_surat: number
    tanggal_pengajuan: number
    tanggal_selesai: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PengajuanSuratAvgAggregateInputType = {
    id?: true
  }

  export type PengajuanSuratSumAggregateInputType = {
    id?: true
  }

  export type PengajuanSuratMinAggregateInputType = {
    id?: true
    nama_lengkap?: true
    no_nik?: true
    no_kk?: true
    tempat_lahir?: true
    tanggal_lahir?: true
    jenis_kelamin?: true
    agama?: true
    pekerjaan?: true
    alamat?: true
    foto_ktp?: true
    jenis_surat?: true
    status?: true
    no_pengajuan?: true
    catatan_penolakan?: true
    nomor_surat?: true
    file_surat?: true
    tanggal_pengajuan?: true
    tanggal_selesai?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PengajuanSuratMaxAggregateInputType = {
    id?: true
    nama_lengkap?: true
    no_nik?: true
    no_kk?: true
    tempat_lahir?: true
    tanggal_lahir?: true
    jenis_kelamin?: true
    agama?: true
    pekerjaan?: true
    alamat?: true
    foto_ktp?: true
    jenis_surat?: true
    status?: true
    no_pengajuan?: true
    catatan_penolakan?: true
    nomor_surat?: true
    file_surat?: true
    tanggal_pengajuan?: true
    tanggal_selesai?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PengajuanSuratCountAggregateInputType = {
    id?: true
    nama_lengkap?: true
    no_nik?: true
    no_kk?: true
    tempat_lahir?: true
    tanggal_lahir?: true
    jenis_kelamin?: true
    agama?: true
    pekerjaan?: true
    alamat?: true
    foto_ktp?: true
    jenis_surat?: true
    data_tambahan?: true
    status?: true
    no_pengajuan?: true
    catatan_penolakan?: true
    nomor_surat?: true
    file_surat?: true
    tanggal_pengajuan?: true
    tanggal_selesai?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PengajuanSuratAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PengajuanSurat to aggregate.
     */
    where?: PengajuanSuratWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanSurats to fetch.
     */
    orderBy?: PengajuanSuratOrderByWithRelationInput | PengajuanSuratOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PengajuanSuratWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanSurats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanSurats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PengajuanSurats
    **/
    _count?: true | PengajuanSuratCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PengajuanSuratAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PengajuanSuratSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PengajuanSuratMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PengajuanSuratMaxAggregateInputType
  }

  export type GetPengajuanSuratAggregateType<T extends PengajuanSuratAggregateArgs> = {
        [P in keyof T & keyof AggregatePengajuanSurat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePengajuanSurat[P]>
      : GetScalarType<T[P], AggregatePengajuanSurat[P]>
  }




  export type PengajuanSuratGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PengajuanSuratWhereInput
    orderBy?: PengajuanSuratOrderByWithAggregationInput | PengajuanSuratOrderByWithAggregationInput[]
    by: PengajuanSuratScalarFieldEnum[] | PengajuanSuratScalarFieldEnum
    having?: PengajuanSuratScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PengajuanSuratCountAggregateInputType | true
    _avg?: PengajuanSuratAvgAggregateInputType
    _sum?: PengajuanSuratSumAggregateInputType
    _min?: PengajuanSuratMinAggregateInputType
    _max?: PengajuanSuratMaxAggregateInputType
  }

  export type PengajuanSuratGroupByOutputType = {
    id: number
    nama_lengkap: string
    no_nik: string
    no_kk: string
    tempat_lahir: string
    tanggal_lahir: string
    jenis_kelamin: string
    agama: string | null
    pekerjaan: string
    alamat: string
    foto_ktp: string | null
    jenis_surat: string
    data_tambahan: JsonValue | null
    status: string
    no_pengajuan: string | null
    catatan_penolakan: string | null
    nomor_surat: string | null
    file_surat: string | null
    tanggal_pengajuan: Date
    tanggal_selesai: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PengajuanSuratCountAggregateOutputType | null
    _avg: PengajuanSuratAvgAggregateOutputType | null
    _sum: PengajuanSuratSumAggregateOutputType | null
    _min: PengajuanSuratMinAggregateOutputType | null
    _max: PengajuanSuratMaxAggregateOutputType | null
  }

  type GetPengajuanSuratGroupByPayload<T extends PengajuanSuratGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PengajuanSuratGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PengajuanSuratGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PengajuanSuratGroupByOutputType[P]>
            : GetScalarType<T[P], PengajuanSuratGroupByOutputType[P]>
        }
      >
    >


  export type PengajuanSuratSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama_lengkap?: boolean
    no_nik?: boolean
    no_kk?: boolean
    tempat_lahir?: boolean
    tanggal_lahir?: boolean
    jenis_kelamin?: boolean
    agama?: boolean
    pekerjaan?: boolean
    alamat?: boolean
    foto_ktp?: boolean
    jenis_surat?: boolean
    data_tambahan?: boolean
    status?: boolean
    no_pengajuan?: boolean
    catatan_penolakan?: boolean
    nomor_surat?: boolean
    file_surat?: boolean
    tanggal_pengajuan?: boolean
    tanggal_selesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pengajuanSurat"]>

  export type PengajuanSuratSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama_lengkap?: boolean
    no_nik?: boolean
    no_kk?: boolean
    tempat_lahir?: boolean
    tanggal_lahir?: boolean
    jenis_kelamin?: boolean
    agama?: boolean
    pekerjaan?: boolean
    alamat?: boolean
    foto_ktp?: boolean
    jenis_surat?: boolean
    data_tambahan?: boolean
    status?: boolean
    no_pengajuan?: boolean
    catatan_penolakan?: boolean
    nomor_surat?: boolean
    file_surat?: boolean
    tanggal_pengajuan?: boolean
    tanggal_selesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pengajuanSurat"]>

  export type PengajuanSuratSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama_lengkap?: boolean
    no_nik?: boolean
    no_kk?: boolean
    tempat_lahir?: boolean
    tanggal_lahir?: boolean
    jenis_kelamin?: boolean
    agama?: boolean
    pekerjaan?: boolean
    alamat?: boolean
    foto_ktp?: boolean
    jenis_surat?: boolean
    data_tambahan?: boolean
    status?: boolean
    no_pengajuan?: boolean
    catatan_penolakan?: boolean
    nomor_surat?: boolean
    file_surat?: boolean
    tanggal_pengajuan?: boolean
    tanggal_selesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pengajuanSurat"]>

  export type PengajuanSuratSelectScalar = {
    id?: boolean
    nama_lengkap?: boolean
    no_nik?: boolean
    no_kk?: boolean
    tempat_lahir?: boolean
    tanggal_lahir?: boolean
    jenis_kelamin?: boolean
    agama?: boolean
    pekerjaan?: boolean
    alamat?: boolean
    foto_ktp?: boolean
    jenis_surat?: boolean
    data_tambahan?: boolean
    status?: boolean
    no_pengajuan?: boolean
    catatan_penolakan?: boolean
    nomor_surat?: boolean
    file_surat?: boolean
    tanggal_pengajuan?: boolean
    tanggal_selesai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PengajuanSuratOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama_lengkap" | "no_nik" | "no_kk" | "tempat_lahir" | "tanggal_lahir" | "jenis_kelamin" | "agama" | "pekerjaan" | "alamat" | "foto_ktp" | "jenis_surat" | "data_tambahan" | "status" | "no_pengajuan" | "catatan_penolakan" | "nomor_surat" | "file_surat" | "tanggal_pengajuan" | "tanggal_selesai" | "createdAt" | "updatedAt", ExtArgs["result"]["pengajuanSurat"]>

  export type $PengajuanSuratPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PengajuanSurat"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nama_lengkap: string
      no_nik: string
      no_kk: string
      tempat_lahir: string
      tanggal_lahir: string
      jenis_kelamin: string
      agama: string | null
      pekerjaan: string
      alamat: string
      foto_ktp: string | null
      jenis_surat: string
      data_tambahan: Prisma.JsonValue | null
      status: string
      no_pengajuan: string | null
      catatan_penolakan: string | null
      nomor_surat: string | null
      file_surat: string | null
      tanggal_pengajuan: Date
      tanggal_selesai: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pengajuanSurat"]>
    composites: {}
  }

  type PengajuanSuratGetPayload<S extends boolean | null | undefined | PengajuanSuratDefaultArgs> = $Result.GetResult<Prisma.$PengajuanSuratPayload, S>

  type PengajuanSuratCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PengajuanSuratFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PengajuanSuratCountAggregateInputType | true
    }

  export interface PengajuanSuratDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PengajuanSurat'], meta: { name: 'PengajuanSurat' } }
    /**
     * Find zero or one PengajuanSurat that matches the filter.
     * @param {PengajuanSuratFindUniqueArgs} args - Arguments to find a PengajuanSurat
     * @example
     * // Get one PengajuanSurat
     * const pengajuanSurat = await prisma.pengajuanSurat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PengajuanSuratFindUniqueArgs>(args: SelectSubset<T, PengajuanSuratFindUniqueArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PengajuanSurat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PengajuanSuratFindUniqueOrThrowArgs} args - Arguments to find a PengajuanSurat
     * @example
     * // Get one PengajuanSurat
     * const pengajuanSurat = await prisma.pengajuanSurat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PengajuanSuratFindUniqueOrThrowArgs>(args: SelectSubset<T, PengajuanSuratFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PengajuanSurat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanSuratFindFirstArgs} args - Arguments to find a PengajuanSurat
     * @example
     * // Get one PengajuanSurat
     * const pengajuanSurat = await prisma.pengajuanSurat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PengajuanSuratFindFirstArgs>(args?: SelectSubset<T, PengajuanSuratFindFirstArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PengajuanSurat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanSuratFindFirstOrThrowArgs} args - Arguments to find a PengajuanSurat
     * @example
     * // Get one PengajuanSurat
     * const pengajuanSurat = await prisma.pengajuanSurat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PengajuanSuratFindFirstOrThrowArgs>(args?: SelectSubset<T, PengajuanSuratFindFirstOrThrowArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PengajuanSurats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanSuratFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PengajuanSurats
     * const pengajuanSurats = await prisma.pengajuanSurat.findMany()
     * 
     * // Get first 10 PengajuanSurats
     * const pengajuanSurats = await prisma.pengajuanSurat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pengajuanSuratWithIdOnly = await prisma.pengajuanSurat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PengajuanSuratFindManyArgs>(args?: SelectSubset<T, PengajuanSuratFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PengajuanSurat.
     * @param {PengajuanSuratCreateArgs} args - Arguments to create a PengajuanSurat.
     * @example
     * // Create one PengajuanSurat
     * const PengajuanSurat = await prisma.pengajuanSurat.create({
     *   data: {
     *     // ... data to create a PengajuanSurat
     *   }
     * })
     * 
     */
    create<T extends PengajuanSuratCreateArgs>(args: SelectSubset<T, PengajuanSuratCreateArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PengajuanSurats.
     * @param {PengajuanSuratCreateManyArgs} args - Arguments to create many PengajuanSurats.
     * @example
     * // Create many PengajuanSurats
     * const pengajuanSurat = await prisma.pengajuanSurat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PengajuanSuratCreateManyArgs>(args?: SelectSubset<T, PengajuanSuratCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PengajuanSurats and returns the data saved in the database.
     * @param {PengajuanSuratCreateManyAndReturnArgs} args - Arguments to create many PengajuanSurats.
     * @example
     * // Create many PengajuanSurats
     * const pengajuanSurat = await prisma.pengajuanSurat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PengajuanSurats and only return the `id`
     * const pengajuanSuratWithIdOnly = await prisma.pengajuanSurat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PengajuanSuratCreateManyAndReturnArgs>(args?: SelectSubset<T, PengajuanSuratCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PengajuanSurat.
     * @param {PengajuanSuratDeleteArgs} args - Arguments to delete one PengajuanSurat.
     * @example
     * // Delete one PengajuanSurat
     * const PengajuanSurat = await prisma.pengajuanSurat.delete({
     *   where: {
     *     // ... filter to delete one PengajuanSurat
     *   }
     * })
     * 
     */
    delete<T extends PengajuanSuratDeleteArgs>(args: SelectSubset<T, PengajuanSuratDeleteArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PengajuanSurat.
     * @param {PengajuanSuratUpdateArgs} args - Arguments to update one PengajuanSurat.
     * @example
     * // Update one PengajuanSurat
     * const pengajuanSurat = await prisma.pengajuanSurat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PengajuanSuratUpdateArgs>(args: SelectSubset<T, PengajuanSuratUpdateArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PengajuanSurats.
     * @param {PengajuanSuratDeleteManyArgs} args - Arguments to filter PengajuanSurats to delete.
     * @example
     * // Delete a few PengajuanSurats
     * const { count } = await prisma.pengajuanSurat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PengajuanSuratDeleteManyArgs>(args?: SelectSubset<T, PengajuanSuratDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PengajuanSurats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanSuratUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PengajuanSurats
     * const pengajuanSurat = await prisma.pengajuanSurat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PengajuanSuratUpdateManyArgs>(args: SelectSubset<T, PengajuanSuratUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PengajuanSurats and returns the data updated in the database.
     * @param {PengajuanSuratUpdateManyAndReturnArgs} args - Arguments to update many PengajuanSurats.
     * @example
     * // Update many PengajuanSurats
     * const pengajuanSurat = await prisma.pengajuanSurat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PengajuanSurats and only return the `id`
     * const pengajuanSuratWithIdOnly = await prisma.pengajuanSurat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PengajuanSuratUpdateManyAndReturnArgs>(args: SelectSubset<T, PengajuanSuratUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PengajuanSurat.
     * @param {PengajuanSuratUpsertArgs} args - Arguments to update or create a PengajuanSurat.
     * @example
     * // Update or create a PengajuanSurat
     * const pengajuanSurat = await prisma.pengajuanSurat.upsert({
     *   create: {
     *     // ... data to create a PengajuanSurat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PengajuanSurat we want to update
     *   }
     * })
     */
    upsert<T extends PengajuanSuratUpsertArgs>(args: SelectSubset<T, PengajuanSuratUpsertArgs<ExtArgs>>): Prisma__PengajuanSuratClient<$Result.GetResult<Prisma.$PengajuanSuratPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PengajuanSurats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanSuratCountArgs} args - Arguments to filter PengajuanSurats to count.
     * @example
     * // Count the number of PengajuanSurats
     * const count = await prisma.pengajuanSurat.count({
     *   where: {
     *     // ... the filter for the PengajuanSurats we want to count
     *   }
     * })
    **/
    count<T extends PengajuanSuratCountArgs>(
      args?: Subset<T, PengajuanSuratCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PengajuanSuratCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PengajuanSurat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanSuratAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PengajuanSuratAggregateArgs>(args: Subset<T, PengajuanSuratAggregateArgs>): Prisma.PrismaPromise<GetPengajuanSuratAggregateType<T>>

    /**
     * Group by PengajuanSurat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengajuanSuratGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PengajuanSuratGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PengajuanSuratGroupByArgs['orderBy'] }
        : { orderBy?: PengajuanSuratGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PengajuanSuratGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPengajuanSuratGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PengajuanSurat model
   */
  readonly fields: PengajuanSuratFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PengajuanSurat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PengajuanSuratClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PengajuanSurat model
   */
  interface PengajuanSuratFieldRefs {
    readonly id: FieldRef<"PengajuanSurat", 'Int'>
    readonly nama_lengkap: FieldRef<"PengajuanSurat", 'String'>
    readonly no_nik: FieldRef<"PengajuanSurat", 'String'>
    readonly no_kk: FieldRef<"PengajuanSurat", 'String'>
    readonly tempat_lahir: FieldRef<"PengajuanSurat", 'String'>
    readonly tanggal_lahir: FieldRef<"PengajuanSurat", 'String'>
    readonly jenis_kelamin: FieldRef<"PengajuanSurat", 'String'>
    readonly agama: FieldRef<"PengajuanSurat", 'String'>
    readonly pekerjaan: FieldRef<"PengajuanSurat", 'String'>
    readonly alamat: FieldRef<"PengajuanSurat", 'String'>
    readonly foto_ktp: FieldRef<"PengajuanSurat", 'String'>
    readonly jenis_surat: FieldRef<"PengajuanSurat", 'String'>
    readonly data_tambahan: FieldRef<"PengajuanSurat", 'Json'>
    readonly status: FieldRef<"PengajuanSurat", 'String'>
    readonly no_pengajuan: FieldRef<"PengajuanSurat", 'String'>
    readonly catatan_penolakan: FieldRef<"PengajuanSurat", 'String'>
    readonly nomor_surat: FieldRef<"PengajuanSurat", 'String'>
    readonly file_surat: FieldRef<"PengajuanSurat", 'String'>
    readonly tanggal_pengajuan: FieldRef<"PengajuanSurat", 'DateTime'>
    readonly tanggal_selesai: FieldRef<"PengajuanSurat", 'DateTime'>
    readonly createdAt: FieldRef<"PengajuanSurat", 'DateTime'>
    readonly updatedAt: FieldRef<"PengajuanSurat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PengajuanSurat findUnique
   */
  export type PengajuanSuratFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * Filter, which PengajuanSurat to fetch.
     */
    where: PengajuanSuratWhereUniqueInput
  }

  /**
   * PengajuanSurat findUniqueOrThrow
   */
  export type PengajuanSuratFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * Filter, which PengajuanSurat to fetch.
     */
    where: PengajuanSuratWhereUniqueInput
  }

  /**
   * PengajuanSurat findFirst
   */
  export type PengajuanSuratFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * Filter, which PengajuanSurat to fetch.
     */
    where?: PengajuanSuratWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanSurats to fetch.
     */
    orderBy?: PengajuanSuratOrderByWithRelationInput | PengajuanSuratOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PengajuanSurats.
     */
    cursor?: PengajuanSuratWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanSurats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanSurats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PengajuanSurats.
     */
    distinct?: PengajuanSuratScalarFieldEnum | PengajuanSuratScalarFieldEnum[]
  }

  /**
   * PengajuanSurat findFirstOrThrow
   */
  export type PengajuanSuratFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * Filter, which PengajuanSurat to fetch.
     */
    where?: PengajuanSuratWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanSurats to fetch.
     */
    orderBy?: PengajuanSuratOrderByWithRelationInput | PengajuanSuratOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PengajuanSurats.
     */
    cursor?: PengajuanSuratWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanSurats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanSurats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PengajuanSurats.
     */
    distinct?: PengajuanSuratScalarFieldEnum | PengajuanSuratScalarFieldEnum[]
  }

  /**
   * PengajuanSurat findMany
   */
  export type PengajuanSuratFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * Filter, which PengajuanSurats to fetch.
     */
    where?: PengajuanSuratWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PengajuanSurats to fetch.
     */
    orderBy?: PengajuanSuratOrderByWithRelationInput | PengajuanSuratOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PengajuanSurats.
     */
    cursor?: PengajuanSuratWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PengajuanSurats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PengajuanSurats.
     */
    skip?: number
    distinct?: PengajuanSuratScalarFieldEnum | PengajuanSuratScalarFieldEnum[]
  }

  /**
   * PengajuanSurat create
   */
  export type PengajuanSuratCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * The data needed to create a PengajuanSurat.
     */
    data: XOR<PengajuanSuratCreateInput, PengajuanSuratUncheckedCreateInput>
  }

  /**
   * PengajuanSurat createMany
   */
  export type PengajuanSuratCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PengajuanSurats.
     */
    data: PengajuanSuratCreateManyInput | PengajuanSuratCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PengajuanSurat createManyAndReturn
   */
  export type PengajuanSuratCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * The data used to create many PengajuanSurats.
     */
    data: PengajuanSuratCreateManyInput | PengajuanSuratCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PengajuanSurat update
   */
  export type PengajuanSuratUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * The data needed to update a PengajuanSurat.
     */
    data: XOR<PengajuanSuratUpdateInput, PengajuanSuratUncheckedUpdateInput>
    /**
     * Choose, which PengajuanSurat to update.
     */
    where: PengajuanSuratWhereUniqueInput
  }

  /**
   * PengajuanSurat updateMany
   */
  export type PengajuanSuratUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PengajuanSurats.
     */
    data: XOR<PengajuanSuratUpdateManyMutationInput, PengajuanSuratUncheckedUpdateManyInput>
    /**
     * Filter which PengajuanSurats to update
     */
    where?: PengajuanSuratWhereInput
    /**
     * Limit how many PengajuanSurats to update.
     */
    limit?: number
  }

  /**
   * PengajuanSurat updateManyAndReturn
   */
  export type PengajuanSuratUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * The data used to update PengajuanSurats.
     */
    data: XOR<PengajuanSuratUpdateManyMutationInput, PengajuanSuratUncheckedUpdateManyInput>
    /**
     * Filter which PengajuanSurats to update
     */
    where?: PengajuanSuratWhereInput
    /**
     * Limit how many PengajuanSurats to update.
     */
    limit?: number
  }

  /**
   * PengajuanSurat upsert
   */
  export type PengajuanSuratUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * The filter to search for the PengajuanSurat to update in case it exists.
     */
    where: PengajuanSuratWhereUniqueInput
    /**
     * In case the PengajuanSurat found by the `where` argument doesn't exist, create a new PengajuanSurat with this data.
     */
    create: XOR<PengajuanSuratCreateInput, PengajuanSuratUncheckedCreateInput>
    /**
     * In case the PengajuanSurat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PengajuanSuratUpdateInput, PengajuanSuratUncheckedUpdateInput>
  }

  /**
   * PengajuanSurat delete
   */
  export type PengajuanSuratDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
    /**
     * Filter which PengajuanSurat to delete.
     */
    where: PengajuanSuratWhereUniqueInput
  }

  /**
   * PengajuanSurat deleteMany
   */
  export type PengajuanSuratDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PengajuanSurats to delete
     */
    where?: PengajuanSuratWhereInput
    /**
     * Limit how many PengajuanSurats to delete.
     */
    limit?: number
  }

  /**
   * PengajuanSurat without action
   */
  export type PengajuanSuratDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PengajuanSurat
     */
    select?: PengajuanSuratSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PengajuanSurat
     */
    omit?: PengajuanSuratOmit<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    nama: string | null
    email: string | null
    password: string | null
    jabatan: string | null
    no_hp: string | null
    createdAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    nama: string | null
    email: string | null
    password: string | null
    jabatan: string | null
    no_hp: string | null
    createdAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    nama: number
    email: number
    password: number
    jabatan: number
    no_hp: number
    createdAt: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    nama?: true
    email?: true
    password?: true
    jabatan?: true
    no_hp?: true
    createdAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    nama?: true
    email?: true
    password?: true
    jabatan?: true
    no_hp?: true
    createdAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    nama?: true
    email?: true
    password?: true
    jabatan?: true
    no_hp?: true
    createdAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    nama: string
    email: string
    password: string
    jabatan: string
    no_hp: string | null
    createdAt: Date
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    jabatan?: boolean
    no_hp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    jabatan?: boolean
    no_hp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    jabatan?: boolean
    no_hp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    jabatan?: boolean
    no_hp?: boolean
    createdAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "email" | "password" | "jabatan" | "no_hp" | "createdAt", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nama: string
      email: string
      password: string
      jabatan: string
      no_hp: string | null
      createdAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly nama: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly jabatan: FieldRef<"Admin", 'String'>
    readonly no_hp: FieldRef<"Admin", 'String'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PengajuanSuratScalarFieldEnum: {
    id: 'id',
    nama_lengkap: 'nama_lengkap',
    no_nik: 'no_nik',
    no_kk: 'no_kk',
    tempat_lahir: 'tempat_lahir',
    tanggal_lahir: 'tanggal_lahir',
    jenis_kelamin: 'jenis_kelamin',
    agama: 'agama',
    pekerjaan: 'pekerjaan',
    alamat: 'alamat',
    foto_ktp: 'foto_ktp',
    jenis_surat: 'jenis_surat',
    data_tambahan: 'data_tambahan',
    status: 'status',
    no_pengajuan: 'no_pengajuan',
    catatan_penolakan: 'catatan_penolakan',
    nomor_surat: 'nomor_surat',
    file_surat: 'file_surat',
    tanggal_pengajuan: 'tanggal_pengajuan',
    tanggal_selesai: 'tanggal_selesai',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PengajuanSuratScalarFieldEnum = (typeof PengajuanSuratScalarFieldEnum)[keyof typeof PengajuanSuratScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    email: 'email',
    password: 'password',
    jabatan: 'jabatan',
    no_hp: 'no_hp',
    createdAt: 'createdAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PengajuanSuratWhereInput = {
    AND?: PengajuanSuratWhereInput | PengajuanSuratWhereInput[]
    OR?: PengajuanSuratWhereInput[]
    NOT?: PengajuanSuratWhereInput | PengajuanSuratWhereInput[]
    id?: IntFilter<"PengajuanSurat"> | number
    nama_lengkap?: StringFilter<"PengajuanSurat"> | string
    no_nik?: StringFilter<"PengajuanSurat"> | string
    no_kk?: StringFilter<"PengajuanSurat"> | string
    tempat_lahir?: StringFilter<"PengajuanSurat"> | string
    tanggal_lahir?: StringFilter<"PengajuanSurat"> | string
    jenis_kelamin?: StringFilter<"PengajuanSurat"> | string
    agama?: StringNullableFilter<"PengajuanSurat"> | string | null
    pekerjaan?: StringFilter<"PengajuanSurat"> | string
    alamat?: StringFilter<"PengajuanSurat"> | string
    foto_ktp?: StringNullableFilter<"PengajuanSurat"> | string | null
    jenis_surat?: StringFilter<"PengajuanSurat"> | string
    data_tambahan?: JsonNullableFilter<"PengajuanSurat">
    status?: StringFilter<"PengajuanSurat"> | string
    no_pengajuan?: StringNullableFilter<"PengajuanSurat"> | string | null
    catatan_penolakan?: StringNullableFilter<"PengajuanSurat"> | string | null
    nomor_surat?: StringNullableFilter<"PengajuanSurat"> | string | null
    file_surat?: StringNullableFilter<"PengajuanSurat"> | string | null
    tanggal_pengajuan?: DateTimeFilter<"PengajuanSurat"> | Date | string
    tanggal_selesai?: DateTimeNullableFilter<"PengajuanSurat"> | Date | string | null
    createdAt?: DateTimeFilter<"PengajuanSurat"> | Date | string
    updatedAt?: DateTimeFilter<"PengajuanSurat"> | Date | string
  }

  export type PengajuanSuratOrderByWithRelationInput = {
    id?: SortOrder
    nama_lengkap?: SortOrder
    no_nik?: SortOrder
    no_kk?: SortOrder
    tempat_lahir?: SortOrder
    tanggal_lahir?: SortOrder
    jenis_kelamin?: SortOrder
    agama?: SortOrderInput | SortOrder
    pekerjaan?: SortOrder
    alamat?: SortOrder
    foto_ktp?: SortOrderInput | SortOrder
    jenis_surat?: SortOrder
    data_tambahan?: SortOrderInput | SortOrder
    status?: SortOrder
    no_pengajuan?: SortOrderInput | SortOrder
    catatan_penolakan?: SortOrderInput | SortOrder
    nomor_surat?: SortOrderInput | SortOrder
    file_surat?: SortOrderInput | SortOrder
    tanggal_pengajuan?: SortOrder
    tanggal_selesai?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PengajuanSuratWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    no_pengajuan?: string
    AND?: PengajuanSuratWhereInput | PengajuanSuratWhereInput[]
    OR?: PengajuanSuratWhereInput[]
    NOT?: PengajuanSuratWhereInput | PengajuanSuratWhereInput[]
    nama_lengkap?: StringFilter<"PengajuanSurat"> | string
    no_nik?: StringFilter<"PengajuanSurat"> | string
    no_kk?: StringFilter<"PengajuanSurat"> | string
    tempat_lahir?: StringFilter<"PengajuanSurat"> | string
    tanggal_lahir?: StringFilter<"PengajuanSurat"> | string
    jenis_kelamin?: StringFilter<"PengajuanSurat"> | string
    agama?: StringNullableFilter<"PengajuanSurat"> | string | null
    pekerjaan?: StringFilter<"PengajuanSurat"> | string
    alamat?: StringFilter<"PengajuanSurat"> | string
    foto_ktp?: StringNullableFilter<"PengajuanSurat"> | string | null
    jenis_surat?: StringFilter<"PengajuanSurat"> | string
    data_tambahan?: JsonNullableFilter<"PengajuanSurat">
    status?: StringFilter<"PengajuanSurat"> | string
    catatan_penolakan?: StringNullableFilter<"PengajuanSurat"> | string | null
    nomor_surat?: StringNullableFilter<"PengajuanSurat"> | string | null
    file_surat?: StringNullableFilter<"PengajuanSurat"> | string | null
    tanggal_pengajuan?: DateTimeFilter<"PengajuanSurat"> | Date | string
    tanggal_selesai?: DateTimeNullableFilter<"PengajuanSurat"> | Date | string | null
    createdAt?: DateTimeFilter<"PengajuanSurat"> | Date | string
    updatedAt?: DateTimeFilter<"PengajuanSurat"> | Date | string
  }, "id" | "no_pengajuan">

  export type PengajuanSuratOrderByWithAggregationInput = {
    id?: SortOrder
    nama_lengkap?: SortOrder
    no_nik?: SortOrder
    no_kk?: SortOrder
    tempat_lahir?: SortOrder
    tanggal_lahir?: SortOrder
    jenis_kelamin?: SortOrder
    agama?: SortOrderInput | SortOrder
    pekerjaan?: SortOrder
    alamat?: SortOrder
    foto_ktp?: SortOrderInput | SortOrder
    jenis_surat?: SortOrder
    data_tambahan?: SortOrderInput | SortOrder
    status?: SortOrder
    no_pengajuan?: SortOrderInput | SortOrder
    catatan_penolakan?: SortOrderInput | SortOrder
    nomor_surat?: SortOrderInput | SortOrder
    file_surat?: SortOrderInput | SortOrder
    tanggal_pengajuan?: SortOrder
    tanggal_selesai?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PengajuanSuratCountOrderByAggregateInput
    _avg?: PengajuanSuratAvgOrderByAggregateInput
    _max?: PengajuanSuratMaxOrderByAggregateInput
    _min?: PengajuanSuratMinOrderByAggregateInput
    _sum?: PengajuanSuratSumOrderByAggregateInput
  }

  export type PengajuanSuratScalarWhereWithAggregatesInput = {
    AND?: PengajuanSuratScalarWhereWithAggregatesInput | PengajuanSuratScalarWhereWithAggregatesInput[]
    OR?: PengajuanSuratScalarWhereWithAggregatesInput[]
    NOT?: PengajuanSuratScalarWhereWithAggregatesInput | PengajuanSuratScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PengajuanSurat"> | number
    nama_lengkap?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    no_nik?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    no_kk?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    tempat_lahir?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    tanggal_lahir?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    jenis_kelamin?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    agama?: StringNullableWithAggregatesFilter<"PengajuanSurat"> | string | null
    pekerjaan?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    alamat?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    foto_ktp?: StringNullableWithAggregatesFilter<"PengajuanSurat"> | string | null
    jenis_surat?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    data_tambahan?: JsonNullableWithAggregatesFilter<"PengajuanSurat">
    status?: StringWithAggregatesFilter<"PengajuanSurat"> | string
    no_pengajuan?: StringNullableWithAggregatesFilter<"PengajuanSurat"> | string | null
    catatan_penolakan?: StringNullableWithAggregatesFilter<"PengajuanSurat"> | string | null
    nomor_surat?: StringNullableWithAggregatesFilter<"PengajuanSurat"> | string | null
    file_surat?: StringNullableWithAggregatesFilter<"PengajuanSurat"> | string | null
    tanggal_pengajuan?: DateTimeWithAggregatesFilter<"PengajuanSurat"> | Date | string
    tanggal_selesai?: DateTimeNullableWithAggregatesFilter<"PengajuanSurat"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PengajuanSurat"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PengajuanSurat"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    nama?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    jabatan?: StringFilter<"Admin"> | string
    no_hp?: StringNullableFilter<"Admin"> | string | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    jabatan?: SortOrder
    no_hp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    nama?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    jabatan?: StringFilter<"Admin"> | string
    no_hp?: StringNullableFilter<"Admin"> | string | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
  }, "id" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    jabatan?: SortOrder
    no_hp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    nama?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    jabatan?: StringWithAggregatesFilter<"Admin"> | string
    no_hp?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type PengajuanSuratCreateInput = {
    nama_lengkap: string
    no_nik: string
    no_kk: string
    tempat_lahir: string
    tanggal_lahir: string
    jenis_kelamin: string
    agama?: string | null
    pekerjaan: string
    alamat: string
    foto_ktp?: string | null
    jenis_surat: string
    data_tambahan?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    no_pengajuan?: string | null
    catatan_penolakan?: string | null
    nomor_surat?: string | null
    file_surat?: string | null
    tanggal_pengajuan?: Date | string
    tanggal_selesai?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PengajuanSuratUncheckedCreateInput = {
    id?: number
    nama_lengkap: string
    no_nik: string
    no_kk: string
    tempat_lahir: string
    tanggal_lahir: string
    jenis_kelamin: string
    agama?: string | null
    pekerjaan: string
    alamat: string
    foto_ktp?: string | null
    jenis_surat: string
    data_tambahan?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    no_pengajuan?: string | null
    catatan_penolakan?: string | null
    nomor_surat?: string | null
    file_surat?: string | null
    tanggal_pengajuan?: Date | string
    tanggal_selesai?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PengajuanSuratUpdateInput = {
    nama_lengkap?: StringFieldUpdateOperationsInput | string
    no_nik?: StringFieldUpdateOperationsInput | string
    no_kk?: StringFieldUpdateOperationsInput | string
    tempat_lahir?: StringFieldUpdateOperationsInput | string
    tanggal_lahir?: StringFieldUpdateOperationsInput | string
    jenis_kelamin?: StringFieldUpdateOperationsInput | string
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    foto_ktp?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_surat?: StringFieldUpdateOperationsInput | string
    data_tambahan?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    no_pengajuan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan_penolakan?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_surat?: NullableStringFieldUpdateOperationsInput | string | null
    file_surat?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pengajuan?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_selesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PengajuanSuratUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama_lengkap?: StringFieldUpdateOperationsInput | string
    no_nik?: StringFieldUpdateOperationsInput | string
    no_kk?: StringFieldUpdateOperationsInput | string
    tempat_lahir?: StringFieldUpdateOperationsInput | string
    tanggal_lahir?: StringFieldUpdateOperationsInput | string
    jenis_kelamin?: StringFieldUpdateOperationsInput | string
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    foto_ktp?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_surat?: StringFieldUpdateOperationsInput | string
    data_tambahan?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    no_pengajuan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan_penolakan?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_surat?: NullableStringFieldUpdateOperationsInput | string | null
    file_surat?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pengajuan?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_selesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PengajuanSuratCreateManyInput = {
    id?: number
    nama_lengkap: string
    no_nik: string
    no_kk: string
    tempat_lahir: string
    tanggal_lahir: string
    jenis_kelamin: string
    agama?: string | null
    pekerjaan: string
    alamat: string
    foto_ktp?: string | null
    jenis_surat: string
    data_tambahan?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    no_pengajuan?: string | null
    catatan_penolakan?: string | null
    nomor_surat?: string | null
    file_surat?: string | null
    tanggal_pengajuan?: Date | string
    tanggal_selesai?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PengajuanSuratUpdateManyMutationInput = {
    nama_lengkap?: StringFieldUpdateOperationsInput | string
    no_nik?: StringFieldUpdateOperationsInput | string
    no_kk?: StringFieldUpdateOperationsInput | string
    tempat_lahir?: StringFieldUpdateOperationsInput | string
    tanggal_lahir?: StringFieldUpdateOperationsInput | string
    jenis_kelamin?: StringFieldUpdateOperationsInput | string
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    foto_ktp?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_surat?: StringFieldUpdateOperationsInput | string
    data_tambahan?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    no_pengajuan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan_penolakan?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_surat?: NullableStringFieldUpdateOperationsInput | string | null
    file_surat?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pengajuan?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_selesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PengajuanSuratUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama_lengkap?: StringFieldUpdateOperationsInput | string
    no_nik?: StringFieldUpdateOperationsInput | string
    no_kk?: StringFieldUpdateOperationsInput | string
    tempat_lahir?: StringFieldUpdateOperationsInput | string
    tanggal_lahir?: StringFieldUpdateOperationsInput | string
    jenis_kelamin?: StringFieldUpdateOperationsInput | string
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    pekerjaan?: StringFieldUpdateOperationsInput | string
    alamat?: StringFieldUpdateOperationsInput | string
    foto_ktp?: NullableStringFieldUpdateOperationsInput | string | null
    jenis_surat?: StringFieldUpdateOperationsInput | string
    data_tambahan?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    no_pengajuan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan_penolakan?: NullableStringFieldUpdateOperationsInput | string | null
    nomor_surat?: NullableStringFieldUpdateOperationsInput | string | null
    file_surat?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal_pengajuan?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggal_selesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    nama: string
    email: string
    password: string
    jabatan?: string
    no_hp?: string | null
    createdAt?: Date | string
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    nama: string
    email: string
    password: string
    jabatan?: string
    no_hp?: string | null
    createdAt?: Date | string
  }

  export type AdminUpdateInput = {
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    jabatan?: StringFieldUpdateOperationsInput | string
    no_hp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    jabatan?: StringFieldUpdateOperationsInput | string
    no_hp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateManyInput = {
    id?: number
    nama: string
    email: string
    password: string
    jabatan?: string
    no_hp?: string | null
    createdAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    jabatan?: StringFieldUpdateOperationsInput | string
    no_hp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    jabatan?: StringFieldUpdateOperationsInput | string
    no_hp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PengajuanSuratCountOrderByAggregateInput = {
    id?: SortOrder
    nama_lengkap?: SortOrder
    no_nik?: SortOrder
    no_kk?: SortOrder
    tempat_lahir?: SortOrder
    tanggal_lahir?: SortOrder
    jenis_kelamin?: SortOrder
    agama?: SortOrder
    pekerjaan?: SortOrder
    alamat?: SortOrder
    foto_ktp?: SortOrder
    jenis_surat?: SortOrder
    data_tambahan?: SortOrder
    status?: SortOrder
    no_pengajuan?: SortOrder
    catatan_penolakan?: SortOrder
    nomor_surat?: SortOrder
    file_surat?: SortOrder
    tanggal_pengajuan?: SortOrder
    tanggal_selesai?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PengajuanSuratAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PengajuanSuratMaxOrderByAggregateInput = {
    id?: SortOrder
    nama_lengkap?: SortOrder
    no_nik?: SortOrder
    no_kk?: SortOrder
    tempat_lahir?: SortOrder
    tanggal_lahir?: SortOrder
    jenis_kelamin?: SortOrder
    agama?: SortOrder
    pekerjaan?: SortOrder
    alamat?: SortOrder
    foto_ktp?: SortOrder
    jenis_surat?: SortOrder
    status?: SortOrder
    no_pengajuan?: SortOrder
    catatan_penolakan?: SortOrder
    nomor_surat?: SortOrder
    file_surat?: SortOrder
    tanggal_pengajuan?: SortOrder
    tanggal_selesai?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PengajuanSuratMinOrderByAggregateInput = {
    id?: SortOrder
    nama_lengkap?: SortOrder
    no_nik?: SortOrder
    no_kk?: SortOrder
    tempat_lahir?: SortOrder
    tanggal_lahir?: SortOrder
    jenis_kelamin?: SortOrder
    agama?: SortOrder
    pekerjaan?: SortOrder
    alamat?: SortOrder
    foto_ktp?: SortOrder
    jenis_surat?: SortOrder
    status?: SortOrder
    no_pengajuan?: SortOrder
    catatan_penolakan?: SortOrder
    nomor_surat?: SortOrder
    file_surat?: SortOrder
    tanggal_pengajuan?: SortOrder
    tanggal_selesai?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PengajuanSuratSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    jabatan?: SortOrder
    no_hp?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    jabatan?: SortOrder
    no_hp?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    jabatan?: SortOrder
    no_hp?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}