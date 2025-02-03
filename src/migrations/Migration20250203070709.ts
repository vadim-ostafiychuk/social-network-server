import { Migration } from "@mikro-orm/migrations";

export class Migration20250203070709 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "file" ("id" serial primary key, "filename" varchar(255) not null, "mimetype" varchar(255) not null, "encoding" varchar(255) not null, "url" varchar(255) not null, "user_id" int null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`
    );

    this.addSql(
      `alter table "file" add constraint "file_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`
    );

    this.addSql(
      `alter table "user" alter column "hashed_password" type text using ("hashed_password"::text);`
    );
    this.addSql(
      `alter table "user" alter column "hashed_password" set not null;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "file" cascade;`);

    this.addSql(
      `alter table "user" alter column "hashed_password" type text using ("hashed_password"::text);`
    );
    this.addSql(
      `alter table "user" alter column "hashed_password" drop not null;`
    );
  }
}
