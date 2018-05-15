/*
 Navicat Premium Data Transfer

 Source Server         : hau
 Source Server Type    : PostgreSQL
 Source Server Version : 100003
 Source Host           : ec2-54-204-21-226.compute-1.amazonaws.com:5432
 Source Catalog        : df07n687imb2qc
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100003
 File Encoding         : 65001

 Date: 11/05/2018 23:02:45
*/


-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS "public"."account";
CREATE TABLE "public"."account" (
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "ip" varchar(255) COLLATE "pg_catalog"."default",
  "hinhanh" varchar(255) COLLATE "pg_catalog"."default",
  "banbe" varchar(4000) COLLATE "pg_catalog"."default",
  "baiviet" varchar(4000) COLLATE "pg_catalog"."default",
  "filedaup" varchar(4000) COLLATE "pg_catalog"."default",
  "danhgia" int8,
  "diem" int8 DEFAULT 0,
  "caudalam" varchar(4000) COLLATE "pg_catalog"."default",
  "caudathem" varchar(4000) COLLATE "pg_catalog"."default",
  "thongbao" varchar(4000) COLLATE "pg_catalog"."default",
  "nguoixembaiviet" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."account"."email" IS 'tài khoản';
COMMENT ON COLUMN "public"."account"."password" IS 'mật khẩu';
COMMENT ON COLUMN "public"."account"."name" IS 'tên';
COMMENT ON COLUMN "public"."account"."ip" IS 'địa chỉ ip';
COMMENT ON COLUMN "public"."account"."hinhanh" IS 'url của hình ảnh';
COMMENT ON COLUMN "public"."account"."banbe" IS 'Danh sách bạn bè';
COMMENT ON COLUMN "public"."account"."baiviet" IS 'Danh sách bài biết';
COMMENT ON COLUMN "public"."account"."filedaup" IS 'Các file đã up lên web. Chỉ lưu đường dẫn';
COMMENT ON COLUMN "public"."account"."danhgia" IS 'Đánh giá của người khác về người này';
COMMENT ON COLUMN "public"."account"."diem" IS 'Điểm của user';
COMMENT ON COLUMN "public"."account"."caudalam" IS 'Câu hỏi user đã làm';
COMMENT ON COLUMN "public"."account"."caudathem" IS 'Câu hỏi user đã thêm';
COMMENT ON COLUMN "public"."account"."thongbao" IS 'Thông báo cho user nào đó';
COMMENT ON COLUMN "public"."account"."nguoixembaiviet" IS 'Người xem bài viết. Bao gồm. 1, friend, all';

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO "public"."account" VALUES ('VanHuynh', '123456', 'Huỳnh', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=1525415233345_img.jpg', 'tanhau', '', '', 0, 0, NULL, NULL, 'Không có thông báo', 'all');
INSERT INTO "public"."account" VALUES ('hiendt', 'hiendt', 'hiendt', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=1525671782651_WIN_20180417_23_58_08_Pro.jpg', '', '', '', 0, 0, NULL, NULL, NULL, NULL);
INSERT INTO "public"."account" VALUES ('Thinh', '123456', 'THỊNH', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=1525613525437_IMG20180304113754.jpg', '', '', '', 0, 0, NULL, NULL, 'Web bị ngu rôi.', NULL);
INSERT INTO "public"."account" VALUES ('admin', '123456', 'Tấn Hậu', 'hau', 'https://uploadserver.azurewebsites.net/img?fileName=1525583611444_27983201_336839080145469_5194809768923833291_o.jpg', 'admin0107', '', '', 0, 0, NULL, NULL, 'Web bị ngu rồi', 'friend');
INSERT INTO "public"."account" VALUES ('admin0107', 'admin', 'admin', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=1525583977380_roi-luong-tu-3.jpg', '', '', '', 0, 0, NULL, NULL, NULL, NULL);
INSERT INTO "public"."account" VALUES ('anhdeptrai', '123456', 'Anh Đẹp Trai', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=1525607758549_Cap.PNG', '', '', '', 0, 0, NULL, NULL, NULL, 'all');

-- ----------------------------
-- Primary Key structure for table account
-- ----------------------------
ALTER TABLE "public"."account" ADD CONSTRAINT "account_pkey" PRIMARY KEY ("email");
