import { useState } from "react"
import { Wallet, Plus } from "lucide-react"

const WalletSection = ({ walletBalance, addMoney }) => {
    const [addAmount, setAddAmount] = useState("")
    const [showAddMoney, setShowAddMoney] = useState(false)

    const handleAddMoney = () => {
        const amount = Number.parseInt(addAmount)
        if (amount > 0) {
            addMoney(amount)
            setAddAmount("")
            setShowAddMoney(false)
            alert(`₹${amount} added to wallet successfully!`)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                    <Wallet className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                        <p className="text-sm text-gray-600">Wallet Balance</p>
                        <p className="text-xl font-bold text-green-600">₹{walletBalance}</p>
                    </div>
                </div>

                {!showAddMoney ? (
                    <button
                        onClick={() => setShowAddMoney(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Money
                    </button>
                ) : (
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            placeholder="Amount"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            min="1"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleAddMoney}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setShowAddMoney(false)}
                            className="text-gray-500 hover:text-gray-700 px-3 py-2 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WalletSection
