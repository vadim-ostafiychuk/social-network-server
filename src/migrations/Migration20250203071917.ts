import { Migration } from '@mikro-orm/migrations';

export class Migration20250203071917 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "file" drop column "encoding";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "file" add column "encoding" varchar(255) not null;`);
  }

}
