/*
Navicat PGSQL Data Transfer

Source Server         : hau
Source Server Version : 100300
Source Host           : ec2-54-204-21-226.compute-1.amazonaws.com:5432
Source Database       : df07n687imb2qc
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 100300
File Encoding         : 65001

Date: 2018-04-10 05:50:29
*/


-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS "public"."account";
CREATE TABLE "public"."account" (
"email" varchar(255) COLLATE "default" NOT NULL,
"password" varchar(255) COLLATE "default",
"name" varchar(255) COLLATE "default",
"ip" varchar(255) COLLATE "default",
"hinhanh" varchar(255) COLLATE "default",
"banbe" varchar(4000) COLLATE "default",
"baiviet" varchar(4000) COLLATE "default",
"filedaup" varchar(4000) COLLATE "default",
"danhgia" int8
)
WITH (OIDS=FALSE)

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

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO "public"."account" VALUES ('15130052@st.hcmua', '111111', '15130052@st.hcmuaf.edu.vn', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523267334854_393c4776ca8deb35a2392c2e33e09a0d.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('aaa@gmail.com', '111111', 'hậu', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523271309711_393c4776ca8deb35a2392c2e33e09a0d.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('aa@gmail.com', '111111', 'hậu', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523271270872_15439818_254731788278338_8656453826238181144_n.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('admin@gmai.com', '123456', 'Lực', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523294620183_29790619_2092967871027667_7710514210557373661_n.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('gggg@gmail.com', '111111', 'vvvv', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523270355125_13178547_102524736832378_1861582596355730142_n.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('nguhoc@gmail.com', '147123', 'zxvzxcvzx', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523274858279_Chrysanthemum.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('vvvv@gmail.com', '111111', 'Tân', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523271390845_15732667_266534673764716_2240923064537937691_o.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('zxcxzv@gmai.com', '122222', 'haaaju', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523292976007_29790619_2092967871027667_7710514210557373661_n.jpg', '', '', '', '0');
INSERT INTO "public"."account" VALUES ('zzzzzz@gmail.com', 'zzzzzz', 'hhss', '127.0.0.1', 'https://uploadserver.azurewebsites.net/img?fileName=imgUploader_1523279183518_Koala.jpg', '', '', '', '0');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table account
-- ----------------------------
ALTER TABLE "public"."account" ADD PRIMARY KEY ("email");
