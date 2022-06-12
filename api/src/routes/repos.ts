import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

export const repos = Router();

repos.get('/', async (req: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  try {
    const data = await fetch('https://api.github.com/users/silverorange/repos');

    let formatData = await data.json();
    formatData = formatData.filter((item: { fork: boolean }) => {
      return item.fork === false;
    });
    res.status(200).send(formatData);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }
});
