import { env } from "../config/env";

export interface PaginationQuery {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
  }
  
  export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }

    
  export interface Paginate  {
    model: any;
    query?: any;
    options: {
      page: number,
      limit: number,
      skip: number,
      sort?: any,
      select?: string;
      populate?: {}[];
    };
  }
  
  export const getPaginationParams = (query: PaginationQuery) => {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Number(query.limit) || env.DEFAULT_PAGE_SIZE, 100); // max limit protection
  
    const skip = (page - 1) * limit;
  
    let sort: any = { createdAt: -1 };
  
    if (query.sort) {
      const [field, order] = query.sort.split(":");
      sort = { [field]: order === "asc" ? 1 : -1 };
    }
  
    return { page, limit, skip, sort };
  };
  
  export const buildPaginationMeta = ( total: number,  page: number, limit: number ) : PaginationMeta => {

    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  };

  export const paginate = async ({model , query = {}, options, } : Paginate) => {
    const { page, limit, skip, sort, select, populate } = options;
  
    const [data, total] = await Promise.all([
      model.find(query).sort(sort).skip(skip).limit(limit).select(`-__v ${select || ""}`).populate(populate || ""),
      model.countDocuments(query),
    ]);
  
    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  };