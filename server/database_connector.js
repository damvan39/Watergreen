const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()



async function main() {
    await prisma.data.create({
        data: {
            data: 'hello kitten'
        },
    })
    const allData = await prisma.data.findMany()
    console.log(allData)
}

main()
    .catch( e=> {throw e })
    .finally(async () => {
        await prisma.$disconnect()
    })

