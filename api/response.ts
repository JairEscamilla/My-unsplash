import { Response } from 'express';

interface IResponse {
  res: Response;
  ok: boolean;
  status: number;
  message: string;
  extra_data?: any;
}

export const response = ({
  res,
  ok,
  status,
  message,
  extra_data
}: IResponse) => {

  if(extra_data){
    res.status(status).json({
        ok,
        message,
        data: extra_data
      });
  }else{
    res.status(status).json({
      ok,
      message
    });
  }
}