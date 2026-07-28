# 기록결

교사가 학생 활동 키워드와 관찰 내용을 입력하면 수집·작성·검토 3단계 에이전트 흐름으로 세특 초안을 만들고, 과목별 결과를 저장·조회하는 정적 Vercel/Supabase 호환 앱입니다.

## 연결 순서

1. Supabase SQL Editor에서 `supabase/schema.sql` 실행
2. 앱의 개인 메뉴에서 Supabase Project URL과 anon public key 입력
3. Vercel에 프로젝트를 정적 사이트로 배포

API 키는 브라우저에 저장되는 데모 방식입니다. 운영 환경에서는 Gemini 호출과 Supabase 쓰기를 Vercel 서버리스 함수로 이동하고, Supabase Auth/RLS를 사용자별로 설정하세요.

