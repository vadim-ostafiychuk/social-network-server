import { Migration } from '@mikro-orm/migrations';

export class Migration20250203081849 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_mainProfileImageId_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_mainProfileImageId_unique";`);
    this.addSql(`alter table "user" drop column "mainProfileImageId";`);

    this.addSql(`alter table "user" alter column "main_profile_image_id" type int using ("main_profile_image_id"::int);`);
    this.addSql(`alter table "user" add constraint "user_main_profile_image_id_foreign" foreign key ("main_profile_image_id") references "file" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_main_profile_image_id_unique" unique ("main_profile_image_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_main_profile_image_id_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_main_profile_image_id_unique";`);

    this.addSql(`alter table "user" add column "mainProfileImageId" int null;`);
    this.addSql(`alter table "user" alter column "main_profile_image_id" type varchar(255) using ("main_profile_image_id"::varchar(255));`);
    this.addSql(`alter table "user" add constraint "user_mainProfileImageId_foreign" foreign key ("mainProfileImageId") references "file" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_mainProfileImageId_unique" unique ("mainProfileImageId");`);
  }

}
