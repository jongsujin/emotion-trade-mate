export interface PushNotificationProps {
  notifications: boolean
  setNotifications: (notifications: boolean) => void
}

export default function PushNotification({
  notifications,
  setNotifications,
}: PushNotificationProps) {
  return (
    <div className="rounded-2xl bg-white">
      <div className="border-b border-gray-100 p-4">
        <h3 className="text-base font-semibold text-gray-900">알림</h3>
      </div>

      <button
        onClick={() => setNotifications(!notifications)}
        className="flex w-full items-center justify-between p-4 active:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🔔</span>
          <div className="text-left">
            <p className="font-medium text-gray-900">푸시 알림</p>
            <p className="text-sm text-gray-600">일지 작성 리마인더</p>
          </div>
        </div>
        <div
          className={`relative h-7 w-12 rounded-full transition-colors ${
            notifications ? 'bg-primary-500' : 'bg-gray-200'
          }`}
        >
          <div
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
              notifications ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </div>
      </button>
    </div>
  )
}
