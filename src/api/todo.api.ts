import axios from "axios";
import { Todo } from "../pages/TodosFunctionComponent";

export class BaseApi {
  protected baseUrl:string;
  constructor(baseUrl:string){
    this.baseUrl = baseUrl;
  }

  get(endpoint:string){
    return axios.get<Todo[]>(`${this.baseUrl}/${endpoint}`).then(res => res.data);
  }
}

export interface ITodoApi {
  getTodos():Promise<Todo[]>;
  getTodoById(id:number):Promise<Todo>;
  create(param:Todo):Promise<any>;
}

export class TodoFetchApi extends BaseApi implements ITodoApi {
  getTodos(): Promise<Todo[]> {
    throw new Error("Method not implemented.");
  }
  getTodoById(id: number): Promise<Todo> {
    throw new Error("Method not implemented.");
  }
  create(param: Todo): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export class TodoAxiosApi extends BaseApi implements ITodoApi {
  private endpoint:string;

  constructor(baseUrl:string, endpoint:string) {
    super(baseUrl);
    this.endpoint = endpoint;
  }

  getTodoById(id:number): Promise<Todo> {
    return axios.get<Todo>(`${this.baseUrl}/${this.endpoint}/${id}`).then(res => res.data);
  }
  getTodos(): Promise<Todo[]> {
      return super.get(this.endpoint);
  }
  create(param:Todo){
    console.log('param', param); // formdan gönderilen değer
    return axios.post(`${this.baseUrl}/${this.endpoint}`, param);
  }
}



