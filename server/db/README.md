## Database

To setup the Prisma MongoDB database connector you need to follow some specific steps:

0. (_Optional but recommended_): Because of the [transactional nature](https://www.prisma.io/docs/concepts/database-connectors/mongodb#example) of the Prisma MongoDB connector, your MongoDB should be in replica-set mode. To get started it is recommended to use a **free** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database.

1. Create a `.env` file inside the **prisma** folder and add the `DATABASE_URL` value of the MongoDB database instance you would like to use.

2. Execute `npm run schema:generate` in the console to generate the prisma-client files required.

3. (_Optional_): Execute `npm run prisma:studio` to open up the Prisma Studio instance, where you can add some test data for the app.
