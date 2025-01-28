import { Migration } from "@mikro-orm/migrations";

export class Migration20250128063624_add_hashed_password extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" add column "hashed_password" text null, add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user" drop column "hashed_password", drop column "created_at", drop column "updated_at";`
    );
  }
}
