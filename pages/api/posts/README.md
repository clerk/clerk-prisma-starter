## API routes

Here we are aiming towards something similar to Ruby on Rails [routing](https://guides.rubyonrails.org/v2.3/routing.html#crud-verbs-and-actions) with the way Next.js handles API routes.

The `index.ts` and `[id].ts` route files will allow a structure like:

| Route              | File       | Switch Case | Usage                    | Response                        |
| ------------------ | ---------- | ----------- | ------------------------ | ------------------------------- |
| GET api/posts      | `index.ts` | -           | List post records        | 200 - List of records           |
| PUT api/posts/1    | `[id].ts`  | `PUT`       | Modify existing record   | 200 - Modified record           |
| DELETE api/posts/1 | `[id].ts`  | `DELETE`    | Delete a specific record | 200 - `{ "completed": "true" }` |
| POST api/posts/1   | `index.ts` | `POST`      | Create a record          | 201 - New record                |
| PATCH api/posts/1  | `[id].ts`  | `default`   | -                        | 405 Method Not Allowed          |
