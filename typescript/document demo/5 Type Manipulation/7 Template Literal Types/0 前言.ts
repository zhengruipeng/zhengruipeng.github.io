//简单的例子
type World = "world";
type Greeting = `hello ${World}`;

//当在内插位置使用联合时，类型是每个联合成员可以表示的每个可能的字符串文字的集合：
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
//type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

