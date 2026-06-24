import type { StoreEvent } from "@/entities/store-event";

export function EventDetail({ event }: { event?: StoreEvent }) {
  return (
    <div className="panel wide">
      <h2>선택 사건</h2>
      <p>{event?.message || "목록 API는 요약 필드만 제공합니다. 상세 API는 다음 단계에서 연결합니다."}</p>
      <dl>
        <dt>채널</dt><dd>{event?.channel}</dd>
        <dt>상태</dt><dd>{event?.status}</dd>
      </dl>
    </div>
  );
}