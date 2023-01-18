import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; // useful for importing and avoid typos

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)