export interface PushNotificationProps {
  notifications: boolean
  setNotifications: (notifications: boolean) => void
}

export default function PushNotification({
  notifications,
  setNotifications,
}: PushNotificationProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F6]">
            <span className="text-xl">🔔</span>
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#191F28]">알림 설정</p>
            <p className="text-xs text-[#8B95A1]">리포트 도착 시 알려드려요</p>
          </div>
        </div>

        <button
            onClick={() => setNotifications(!notifications)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                notifications ? 'bg-[#3182F6]' : 'bg-[#E5E8EB]'
            }`}
        >
            <span
                className={`absolute left-[2px] top-[2px] h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
      </div>
    </div>
  )
}
