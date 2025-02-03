import { Migration } from '@mikro-orm/migrations';

export class Migration20250203081751 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "mainProfileImageId" int null, add column "main_profile_image_id" varchar(255) null;`);
    this.addSql(`alter table "user" add constraint "user_mainProfileImageId_foreign" foreign key ("mainProfileImageId") references "file" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_mainProfileImageId_unique" unique ("mainProfileImageId");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_mainProfileImageId_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_mainProfileImageId_unique";`);
    this.addSql(`alter table "user" drop column "mainProfileImageId", drop column "main_profile_image_id";`);
  }

}
