import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

export const repos = Router();

repos.get('/', async (req: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  try {
    const data = await fetch('https://api.github.com/users/silverorange/repos');

    const formatData = await data.json();
    res.status(200).send(formatData);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }
});
