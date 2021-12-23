import { hash } from 'bcryptjs'


import { prisma } from '../../../../database/prismaClient'
import { ICustomerDto } from '../../dto/CustomerDto'

export class CreateCustomerUseCase {
    async execute({ username, password }: ICustomerDto): Promise<ICustomerDto> {
        // verify if customer already exists
        const customerAlreadyExists = await prisma.customers.findUnique({
            where: {
                username: {
                    mode: "insensitive"
                }
            }
        })

        if(customerAlreadyExists) {
            throw new Error("Customer already exists.")
        }

        // Password cryptografy 
        const passwordHashed = await hash(password, 10)

        // Save customer
        const customer = await prisma.customer.create({
            data: {
                username,
                passwordHashed
            }
        })

        return customer


    }

}
