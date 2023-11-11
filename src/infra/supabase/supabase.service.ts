import { createClient } from '@supabase/supabase-js';
import {
  SUPABASE_IMAGE_TOKEN,
  SUPABASE_KEY,
  SUPABASE_URL,
} from 'src/domain/contants/supabase.constants';

export class SupabaseService {
  async upload(bucket: string, file: Express.Multer.File): Promise<string> {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
      },
    });
    const result = await supabase.storage
      .from(bucket)
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    console.log(result);

    const nameParsed = result.data.path.replace(' ', '%20');

    return `${SUPABASE_URL}/storage/v1/object/sign/${bucket}/${nameParsed}?token=${SUPABASE_IMAGE_TOKEN}&t=2023-11-11T13%3A24%3A29.419Z`;
  }
}
