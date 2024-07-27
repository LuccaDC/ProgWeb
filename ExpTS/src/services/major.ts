import { PrismaClient, Major } from '@prisma/client';
import { CreateMajorDto, UpdateMajorDto } from '../types/major';

const prisma = new PrismaClient();

export const getAllMajors = async(
): Promise<Major[]> => {
    return prisma.major.findMany();
}
export const createMajor = async (
    newMajor: CreateMajorDto
): Promise<Major> => {
    return await prisma.major.create({ data: newMajor })
}

export const majorAlreadyExists = async (
    name: string
): Promise<boolean> => {
    const major = await prisma.major.findUnique({
        where: { name }
    });
    return !!major;
}

export const getMajor = async (
    id: string
): Promise<Major> => {
    const major = await prisma.major.findUnique({
        where: { id }
    });
    if (!major) {
        throw new Error('Major not found');
    }
    return major;
}

export const updateMajor = async (
    id: string, major: UpdateMajorDto
): Promise<[affectedCount: number]> => {
    const updatedMajor = await prisma.major.updateMany({
        where: { id },
        data: major
    });
    return [updatedMajor.count];
};

export const removeMajor = async (
    id: string
): Promise<number> => {
    const deletedMajor = await prisma.major.delete({
        where: { id }
    });
    return deletedMajor ? 1 : 0;
};